import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea } from "@material-tailwind/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const IMSDialog = props => {
    const styles = {
        width: props.width,
        margin: "auto",
        marginTop: "20vh",
    }
    return (
        <div>
            <Dialog style={styles} open={props.open} handler={props.handleOpen}>
                <div className="flex items-center justify-between pt-2">
                    <DialogHeader><p className="ml-3 p-2 font-semibold text-gray-800">{props.title}</p></DialogHeader>
                    <button onClick={props.handleOpen}><FontAwesomeIcon className="mr-3 p-2 rounded-md bg-rose-700 hover:bg-rose-800 text-white" icon={faXmark}/></button>
                </div>
                <DialogBody divider>
                    <div style={{width: props.contentWidth, margin: "auto"}}>
                        {props.content}
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    )
}