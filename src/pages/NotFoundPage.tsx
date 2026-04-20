import { Link, useNavigate } from "react-router";
import { BaseButton } from "@/components/BaseButton";

interface Props {
  title?: string;
  message?: string;
}

export function NotFoundPage({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or was moved.",
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex text-center justify-center flex-grow items-center font-inter pt-24 pb-24">
      <div className="max-w-md mx-auto">
        <p className="text-6xl font-bold text-gray-300 font-lexend">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="mt-3 text-gray-500">{message}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <BaseButton
            text="Go back"
            variant="ghost"
            color="secondary"
            size="medium"
            onClick={() => navigate(-1)}
          />
          <Link to="/" className="no-underline">
            <BaseButton text="Back to notes" variant="solid" color="primary" size="medium" />
          </Link>
        </div>
      </div>
    </div>
  );
}
