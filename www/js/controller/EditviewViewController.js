/**
 * @author Jörn Kreutel
 */
import {mwf} from "../Main.js";
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
        this.viewProxy = this.bindElement("mediaEditViewTemplate",{item: this.mediaItem},this.root).viewProxy;


        // TODO: do databinding, set listeners, initialise the view
        this.editviewForm= this.root.querySelector("#editForm");
        this.editviewForm.onsubmit = (e) =>{
            //alert("sie haben das Formular versendet");
            e.preventDefault();
            if(!this.mediaItem.created) {
                this.mediaItem.create().then(() => {
                    //alert("Media Item created " + this.mediaItem);
                })
                this.previousView({createdItem: this.mediaItem});
            }else{
                this.mediaItem.update().then(() => {
                    //alert("Media Item updated " + this.mediaItem);
                })
                this.previousView({updatedItem: this.mediaItem});
            }
        }

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

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
    }

}

