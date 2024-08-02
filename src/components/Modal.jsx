import './Modal.css'

export default function Modal ({ isOpen, onClose, children })  
{
    if (!isOpen) return null;
 
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className='modal-card' onClick={e => {e.stopPropagation()}}>
                <a className="close" onClick={onClose}>&#x2715;</a>
                {children}
            </div>
        </div>
    );
}
import './Modal.css'

export default function Modal ({ isOpen, onClose, children })  
{
    if (!isOpen) return null;
 
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className='modal-card' onClick={e => {e.stopPropagation()}}>
                <a className="close" onClick={onClose}>&#x2715;</a>
                {children}
            </div>
        </div>
    );
}