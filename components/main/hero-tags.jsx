import { Blocks, BookCheck, GitPullRequestCreateArrow } from "lucide-react";

export function HeroTags(props) {
    return (
        <li className="flex align-center gap-2 text-gray-500 text-xs font-medium">
            <GitPullRequestCreateArrow size={16} />
            <span>{props.title}</span>
        </li>
    )
}