/**
 * @author Jörn Kreutel
 */
import {mwf} from "../Main.js";
import {entities} from "../Main.js";

export default class ReadviewViewController extends mwf.ViewController {

    constructor() {
        super();
        this.viewProxy = null;
        console.log("ReadviewViewController()");
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {

        // TODO: do databinding, set listeners, initialise the view
        //var mediaItem = new entities.MediaItem("m","https://placekitten.com/300/400");
        this.mediaItem = this.args.item;
        this.viewProxy = this.bindElement("mediaReadviewTemplate",{item: this.mediaItem},this.root).viewProxy;

        //---------------------------------Hier nochmal ansetzen, Objecte werden immer weiter transportiert

        //Originales Objekt um alle Änderungen in der Editview Databinding wiedeer rückgängig zu machen
        this.Original= JSON.parse(JSON.stringify(this.mediaItem));
        console.log("Das Original nach Erstellen:");
        console.log(this.Original);

        this.viewProxy.bindAction("deleteItem",(() => {
            // mediaItem.delete().then(() => {
            //     this.previousView({deletedItem:mediaItem});
            // })
            this.deleteItem(this.mediaItem).then(() => {
               // this.previousView({deletedItem:this.mediaItem});
            })
        }));

        this.viewProxy.bindAction("changeToEditView",(() => {
            this.nextView("mediaEditView", {item: this.mediaItem}, false);
        }));

        // call the superclass once creation is done
        super.oncreate();
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    bindListItemView(listviewid, itemview, itemobj) {
        // TODO: implement how attributes of itemobj shall be displayed in itemview
    }

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemSelected(itemobj, listviewid) {
        // TODO: implement how selection of itemobj shall be handled
    }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemMenuItemSelected(menuitemview, itemobj, listview) {
        // TODO: implement how selection of the option menuitemview for itemobj shall be handled
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

    // URL für Online Videos:
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4.

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
        alert(returnStatus);
        if(returnStatus==="upd"){
            this.viewProxy.update({item: returnValue.updatedItem});
        }else if(returnStatus==="del"){
            this.previousView();
            return false;
        }else{
            //---------------------------------Hier nochmal ansetzen, Objekte werden immer weiter transportiert
            console.log("Das Original nach Return:");
            console.log(this.Original);
            this.mediaItem= this.args.item;
            this.viewProxy.update({item: this.mediaItem});
        }
    }

    async onpause(){
        const video = this.root.querySelector("video") ;

        //Diese Funktion ist Frameworkbasiert
        if(video){
            video.pause();
        }
        super.onpause();
    }

    async deleteItem(item) {
        this.showDialog("mediaItemDeleteDialog",{
            item: item,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    item.delete().then(() => {
                        // this.removeFromListview(item._id);
                    });
                    this.hideDialog();
                    this.previousView({deletedItem:this.mediaItem});
                }),/*!!!*/
                quitDelete: ((event) => {
                    this.hideDialog();
                })
            }
        })
    }
}

