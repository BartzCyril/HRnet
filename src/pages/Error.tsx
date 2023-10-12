import {Link} from "react-router-dom";

export function Error() {
    return (
        <div className="container mx-auto">
            <div>
                <div>404</div>
                <p>Oups! La page que vous demandez n'existe pas.</p>
            </div>
            <Link to="/HRnet/">
                Retourner sur la page d’accueil
            </Link>
        </div>
    )
}