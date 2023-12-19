import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onStar, onRead }) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>

                    <EmailPreview email={email} onStar={onStar} onRemoveEmail={onRemoveEmail} onRead={onRead} />

                </li>
            )}
        </ul>
    )
}
