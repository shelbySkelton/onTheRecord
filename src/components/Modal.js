import React, { useState } from 'react';

const Modal = (props) => {
    const { setIsModal } = props;

    return (
        <div>
            <div>
                <div>
                    <h3>We would love to hear your feedback!</h3>
                </div>
                <div>
                    <form>
                        <textarea input="text" rows="20" cols="100">
                            Enter text here...
                        </textarea>
                        <button onClick={() => setIsModal(false)}>Exit</button>
                        <button onClick={() => setIsModal(false)}>Submit</button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Modal;