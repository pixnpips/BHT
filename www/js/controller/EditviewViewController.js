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

        this.filedata=null;

        //erstellen erstmal ein MediaItemobject oder nehmen es aus den Args der Voransicht!!
        this.mediaItem = this.args?.item || new entities.MediaItem("", );

        //Binden unser ausgeschnittenes Template an einen Viewproxy damit es angezeigt werden kann und damit wir ractive nutzen können!
        //Hier findet das Databinding statt!!!
        //Das ist eine Repräsentation des Templates das wir mit Ractive Databinding gefüllt haben zu Anzeige
        this.viewProxy = this.bindElement("mediaEditViewTemplate",{item: this.mediaItem},this.root).viewProxy;

        // TODO: do databinding, set listeners, initialise the view
        this.editviewForm= this.root.querySelector("#editForm");

        this.originalsrc=this.mediaItem.src;
        this.originalContenttype= this.mediaItem.contentType;

        this.editviewForm.onsubmit = (e) =>{
            e.preventDefault();
            this.uploadData();
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
            this.getMediaViewfromURL();
        });

        //Hier wird geprüft ob der Dateiupload angezeigt werden soll
        this.uploadfieldset= document.getElementById("fsupload");
        this.showUploadView();

        //Inputelement auswählen und Eventlistener einfügen

        this.editviewForm.filesrc.onchange= () =>{
            this.displayPreview();
        }
        // call the superclass once creation is done
        super.oncreate();
    }

    getMediaViewfromURL(){
        const req= new XMLHttpRequest();
        req.open('get', this.url.value);
        req.send();
        req.onerror=(e)=>{
            alert ("Ungültige URL, Bildinhalt nicht aktualisiert");
            //check
            this.url.value=this.mediaItem.src;
            alert (false);
            return false;
        }
        req.onload=(e)=>{
            //alert(req.getResponseHeader('Content-Type'));
            this.mediaItem.contentType=req.getResponseHeader('Content-Type');

            //check
            this.mediaItem.src= this.url.value;
            this.viewProxy.update({item:this.mediaItem});
            alert(true);
            return true;
        }
    }

    // URL divers:
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    // http://192.168.178.45:7383/content/mov/1674906589146_bbb.mp4
    //  https://placekitten.com/150/200

    displayPreview () {
        //erstellen Url und Object zum Anzeigen der Vorschau
        this.filedata = this.editviewForm.filesrc.files[0];
        //Temporär - benutzen wir nicht, stattdessen die richtige URl nach dem Opload
        const filedataurl= URL.createObjectURL(this.filedata);
        this.url.value=filedataurl;
        this.mediaItem.src=filedataurl;
        this.mediaItem.contentType= this.filedata.type;
        this.viewProxy.update({item:this.mediaItem});
    }


     uploadData () {
        // verschicken wir das FileinputFile per Formdata und XML HTTP Request
        if(this.filedata || this.getMediaViewfromURL){
            const uploadData = new FormData;
            uploadData.append("filesrc", this.filedata);
            const brieftaube= new XMLHttpRequest();
            brieftaube.open("POST","api/upload");
            brieftaube.send(uploadData);

            // alert("Daten sind da");

            brieftaube.onload=(e)=>{
                //Analyse des Filedata Type zum aktuelisieren der Vorschau und des Ractive Templates HTML
                this.mediaItem.contentType= this.filedata.type;

                //Erstellen des Jasonobjects zum auslesen der Werte
                const responseString=brieftaube.responseText;
                const JsonObj= JSON.parse(responseString);
                //console.log(JsonObj);

                //Erstellen einer gültigen URL
                const responseURl= brieftaube.responseURL.substring(0,27);
                const objectURL=JsonObj.data["filesrc"];
                const completeURL=responseURl.concat(objectURL);

                //Hier reicht die MediaItemsource weil wir Ractive Databinding benutzen
                this.mediaItem.src=completeURL;

                // anschließendes Update des Viewproxy, das ist wichtig damit wir direkt die Vorschau auf dem Viewproxy sehen
                //this.viewProxy.update({item:this.mediaItem});
                // console.log("?\n?\n?");
                // console.log(this.mediaItem);
            }
            this.updateorCreateItem(this.mediaItem);
        }
    }

    onback() {
        this.mediaItem.src=this.originalsrc;
        this.mediaItem.contentType=this.originalContenttype;
        this.editviewForm.reset();
        super.onback();
    }


    showUploadView(){
        let crudstate=MyApplication.currentCRUDScope;
        if(crudstate==="local") {
            this.uploadfieldset.hidden=true;
        }
    }


    updateorCreateItem (item){
        //alert(item.created);
        if(!item.created) {
            item.create().then(() => {
                //alert("Media Item created " + this.mediaItem);
                this.previousView({createdItem: item},"cre");
            })
        }else{
            // await(this.uploadData());
            item.update().then(() => {
                this.previousView({updatedItem: item},"upd");
            })
            // console.log("!\n!\n!");
            // console.log(this.mediaItem);
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

    async onpause(){
        const video = this.root.querySelector("video") ;
        //Diese Funktion ist Frameworkbasiert
        if(video){
            video.pause();
        }
        super.onpause();
    }

    autofillUrl() {
        this.url.focus();
        this.url.value= "https://placekitten.com/150/200";
        this.image.setAttribute("src", "https://placekitten.com/150/200");
    }

}

