import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
            Landing Page (Unprotected)
            <div>
                <Button asChild>
                    <Link href="/sign-in">
                        Login
                    </Link>
                </Button>
                <Button>
                    <Link href="/sign-up">
                        Register
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;