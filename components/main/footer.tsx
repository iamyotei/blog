import { Separator } from "../ui/separator";
import { Container } from "./container";

export default function Footer() {
    return (
        <footer>
            <Container>
                <Separator />
                <small className="text-xs leading-5 text-gray-500 my-6 flex">© 2026 Vadim Sokolov. All rights reserved.</small>
            </Container>
        </footer>
    );
}