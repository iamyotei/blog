import Link from "next/link";
import { Button } from "../ui/button";
import { Container } from "./container";
import { Nav } from "./nav";
import { PAGES } from "@/app/lib/pages.config";

export function Header() {
  return (

      <header className="pt-12 pb-18 w-full">
            <Container>
        <div className="flex items-center justify-between">

          <Link href={PAGES.HOME}>Vadim Sokolov</Link>

          <Nav />

        </div>
        </Container>
      </header>
  );
}