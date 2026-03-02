import { Separator } from "../ui/separator";
import { Container } from "./container";

export default function Footer() {
    return (
        <footer className="mb-6 mt-6">
            <Container>
                <Separator className="mb-5" />
                <small className="text-xs leading-5 text-gray-500 md:order-1 md:mt-0">© 2026 Vadim Sokolov. All rights reserved.</small>
            </Container>
        </footer>
    );
}