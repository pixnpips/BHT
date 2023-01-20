/**
 * @author Jörn Kreutel
 */
import {mwf, MyApplication} from "../Main.js";
import {entities} from "../Main.js";
//import {GenericCRUDImplLocal} from "../Main.js";

export default class ListviewViewController extends mwf.ViewController {

    constructor() {
        super();
        console.log("ListviewViewController()");
        //this.crudops = GenericCRUDImplLocal.newInstance("MediaItem");
        this.addNewMediaItemElement = null;
        this.switchCrudButton=null;
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view

        // Hier wird unser crudopsObject mit der Funktion readAll aufgerufen  um unsere
        //anfangsansicht mit den Daten vom Server aufzubauen!!!

        // this.crudops.readAll().then((items) => {
        //     this.initialiseListview(items);
        // });


        //---------------Auslesen aller ListItems aus der lokalen oder remote Datenbank -------------//

            entities.MediaItem.readAll().then((items) => {
                this.initialiseListview(items);
            });




        //Hier wird ein new Media Item erstellt und er Eventlistener auf das + Button gesetzt
        this.addNewMediaItemElement = this.root.querySelector("#addNewMediaItem");
        this.addNewMediaItemElement.onclick = (() => {

            //this.createNewItem(); --- Achtung hier haben wir den einfachen Dialog aufgerufen!!!

            // this.crudops.create(new entities.MediaItem("m","https:
            // placekitten.com/100/100")).then((created) => {
            // this.addToListview(created);
            // });

            //Jetzt wechseln wir in unsere EditView
            this.nextView("mediaEditView");

        });

        //----------------Button für das Umschalten zwischen remote oder local CRUD-----------------//

        this.switchCrudButton=this.root.querySelector("#swCRUD");
        this.switchCrudButton.onclick=(() =>{
            this.switchCrud();
        });

        this.root.querySelector("#crudState").textContent=MyApplication.currentCRUDScope;


        //Hier reagiert die Listview mittels eines Listeners auf gelöschte MediaItemobjecte und entfernt diese aus der Sicht
        //mwf EventMatcher ist die Funktion mit der man allgemein bekannt macht,
        // das in der Listenansicht ein Element gelöscht,erstellt oder geupdated wurde!
        //!!!!Achtung in den Funktionen unten wurden die addtoListView usw ausgelagert in den Entitymanager

        this.addListener(new mwf.EventMatcher("crud","created","MediaItem"),((event) => {
            this.addToListview(event.data);
        }));

        this.addListener(new mwf.EventMatcher("crud","updated","MediaItem"),((event) => {
            this.updateInListview(event.data._id,event.data);
        }));

        this.addListener(new mwf.EventMatcher("crud","deleted","MediaItem"),((event) => {
            this.removeFromListview(event.data);
        }));

        // call the superclass once creation is done
        super.oncreate();
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    // bindListItemView(listviewid, itemview, itemobj) {
    //     // TODO: implement how attributes of itemobj shall be displayed in itemview
    //     itemview.root.getElementsByTagName("img")[0].src =
    //         itemobj.src;
    //     itemview.root.getElementsByTagName("h2")[0].textContent =
    //         itemobj.title+itemobj._id;
    //     itemview.root.getElementsByTagName("h3")[0].textContent =
    //         itemobj.added;
    // }

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */

    onListItemSelected(itemobj, listviewid) {
        // TODO: implement how selection of itemobj shall be handled
        //alert("Element " + itemobj.title + itemobj._id + " wurde ausgewählt!");

        //Hier wurde der Übergang zur Nextview mittels Zuweisung des Attributes data-mwf-targetview="mediaReadview" im li Item der MediaOverview ersetzt
        //this.nextView("mediaReadview",{item: itemobj});
    }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemMenuItemSelected(menuitemview, itemobj, listview) {
        // TODO: implement how selection of the option menuitemview for itemobj shall be handled
        super.onListItemMenuItemSelected(menuitemview, itemobj, listview);
    }

    /*
     * for views with dialogs
     * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
     */
    bindDialog(dialogid, dialogview, dialogdataobj) {
        // call the supertype function
        super.bindDialog(dialogid, dialogview, dialogdataobj);

        // TODO: implement action bindings for dialog, accessing dialog.root
    }

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
     //Das hier ist nicht mehr von nöten weil die Aktionen mittels des Listeners in der oncreate Methode ausgeführt wurden
    // async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
    //     // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
    //     if (nextviewid == "mediaReadview" || nextviewid== "mediaEditView" ){
    //         if(returnValue){
    //             if (returnValue.deletedItem){
    //                 this.removeFromListview(returnValue.deletedItem._id)
    //             }
    //             // else if(returnValue.createdItem){
    //             //     this.addToListview(returnValue.createdItem);
    //             // }
    //             // else if(returnValue.updatedItem){
    //             //     this.updateInListview(returnValue.updatedItem._id, returnValue.updatedItem);
    //             // }
    //         }
    //     }
    // }

    createNewItem() {
        var newItem = new entities.MediaItem("", "");
        this.showDialog("mediaItemDialog", {
            item: newItem,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    newItem.create().then(() => {
                        //this.addToListview(newItem);
                    });
                    this.hideDialog();
                })
            }
        });
    }

    //----------------function für das Umschalten zwischen remote oder local CRUD-----------------//

    switchCrud(){
        let state=MyApplication.currentCRUDScope;
        if (state==="local"){MyApplication.switchCRUD("remote");}
        else if(state==="remote"){MyApplication.switchCRUD("local");}
        else(alert ("No detected Database"));


        entities.MediaItem.readAll().then((items) => {
            this.initialiseListview(items);
        });
        this.root.querySelector("#crudState").textContent=MyApplication.currentCRUDScope;
    }


    editItem(item) {
        this.showDialog("mediaItemDialog", {
            item: item,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    item.update().then(() => {
                        //this.updateInListview(item._id,item);
                    });
                    this.hideDialog();
                }),/*!!!*/
                deleteItem: ((event) => {
                    this.hideDialog();
                    this.deleteItem(item);
                })
            }
        });
    }


    //  deleteItem(item) {
    //     item.delete().then(() => {
    //         // this.removeFromListview(item._id);
    //     });
    //     this.hideDialog();
    // }

    deleteItem(item) {
        this.showDialog("mediaItemDeleteDialog",{
            item: item,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    item.delete().then(() => {
                        // this.removeFromListview(item._id);
                    });
                    this.hideDialog();
                }),/*!!!*/
                quitDelete: ((event) => {
                    this.hideDialog();
                })
            }
        })
    }

    copyItem(item){
        let newItem = new entities.MediaItem(item.title, item.src);
        newItem.description=item.description;
        newItem.srcType=item.srcType;
        newItem.contentType=item.contentType;
        newItem.create();
    }
}

