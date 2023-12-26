import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onStar, setIsRead, onCompose}) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>

                    <EmailPreview email={email} onStar={onStar} onRemoveEmail={onRemoveEmail} setIsRead={setIsRead} onCompose={onCompose} />

                </li>
            )}
        </ul>
    )
}
