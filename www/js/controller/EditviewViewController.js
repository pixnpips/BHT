/**
 * @author Jörn Kreutel
 */
import {mwf, MyApplication} from "../Main.js";
import {entities} from "../Main.js";

export default class EditviewViewController extends mwf.ViewController {

    constructor() {
        super();
        console.log("EditviewViewController()");
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {


        //erstellen erstmal ein MediaItemobject oder nehmen es aus den Args der Voransicht!!
        this.mediaItem = this.args?.item || new entities.MediaItem("", );
        //"https://placekitten.com/200/200"


        //Binden unser ausgeschnittenes Template an einen Viewproxy damit es angezeigt werden kann und damit wir ractive nutzen können!
        //Hier findet das Databinding statt!!!
        //Das ist eine Repräsentation des Templates das wir mit Ractive Databinding gefüllt haben zu Anzeige
        this.viewProxy = this.bindElement("mediaEditViewTemplate",{item: this.mediaItem},this.root).viewProxy;

        // TODO: do databinding, set listeners, initialise the view
        this.editviewForm= this.root.querySelector("#editForm");

        this.editviewForm.onsubmit = (e) =>{
            //alert("sie haben das Formular versendet");
            e.preventDefault();
            this.updateorCreateItem(this.mediaItem);
        }

        this.viewProxy.bindAction("deleteItem",(() => {
            // mediaItem.delete().then(() => {
            //     this.previousView({deletedItem:mediaItem});
            // })
            this.deleteItem(this.mediaItem).then(() => {
                // this.previousView({deletedItem:this.mediaItem});
            })
        }));

        this.viewProxy.bindAction("autofillUrl",(() => {
            this.autofillUrl();
        }));

        // Hier wird der URl Input ausgelesen und als img src Attribut gesetzt
        // Im HTML Dokument  haben wir die beiden Attribute jeweils mit ractives if/else statements umgesetzt

        this.url= document.querySelector('input[name="url"]');
        this.image= document.querySelector(".editImage");

        this.url.addEventListener('blur', (e) =>{
            this.image.setAttribute("src", this.url.value );
            this.mediaItem.src= this.url.value;
        });

        //Hier wird geprüft ob der Dateiupload angezeigt werden soll
        this.uploadfieldset= document.getElementById("fsupload");
        this.showUploadView();

        //Inputelement auswählen und Eventlistener einfügen

        this.editviewForm.filesrc.onchange= () =>{
            this.uploadImage();
        }
        // call the superclass once creation is done
        super.oncreate();
    }

    uploadImage () {
        //erstellen Url und Object zum Anzeigen der Vorschau
        const filedata = this.editviewForm.filesrc.files[0];
        const filedataurl= URL.createObjectURL(filedata);

        // Zuweisen der Daten für die Vorschau
        this.image.src=filedataurl;
        this.mediaItem.src=filedataurl;

        // verschicken wir das FileinputFile per Formdata und XML HTTP Request
        if(filedata){
            const uploadData = new FormData;
            uploadData.append("filesrc", filedata);
            const brieftaube= new XMLHttpRequest();
            brieftaube.open("POST","api/upload");
            brieftaube.send(uploadData);

            //Temporär
            this.image.src=filedataurl;
            this.mediaItem.src=filedataurl;

            brieftaube.onload=(e)=>{

            }
        }

        // Update des Viewproxy
        this.viewProxy.update({item: this.mediaItem});
    }

    showUploadView(){
        let crudstate=MyApplication.currentCRUDScope;
        if(crudstate==="local") {
            this.uploadfieldset.hidden=true;
        }
    }



    updateorCreateItem= (item) =>{
        if(!item.created) {
            item.create().then(() => {
                //alert("Media Item created " + this.mediaItem);
                this.previousView({createdItem: item},"cre");
            })
        }else{
            item.update().then(() => {
                //alert("Media Item updated " + this.mediaItem);
                this.previousView({updatedItem: item},"upd");
            })
        }
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

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
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
                    this.previousView({deletedItem:this.mediaItem},"del");
                }),/*!!!*/
                quitDelete: ((event) => {
                    this.hideDialog();
                })
            }
        })
    }

    autofillUrl() {
        this.url.focus();
        this.url.value= "https://placekitten.com/150/200";
        this.image.setAttribute("src", "https://placekitten.com/150/200");
    }

}

