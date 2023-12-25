import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onStar, setIsRead ,folder}) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>

                    <EmailPreview email={email} onStar={onStar} onRemoveEmail={onRemoveEmail} setIsRead={setIsRead} folder={folder} />

                </li>
            )}
        </ul>
    )
}
