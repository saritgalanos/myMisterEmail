import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onStar, setIsRead }) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>

                    <EmailPreview email={email} onStar={onStar} onRemoveEmail={onRemoveEmail} setIsRead={setIsRead} />

                </li>
            )}
        </ul>
    )
}
