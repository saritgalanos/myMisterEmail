import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onStar }) {
    return (
        // <section className="email-list">
        //     <h1>Email List</h1>
        // </section>


        <ul className="email-list">
            {emails.map(email =>
                <li  key={email.id}>
                   
                    <EmailPreview email={email} onStar={onStar} onRemoveEmail={onRemoveEmail}/>
                    
                </li>
            )}
        </ul>
    )
}
