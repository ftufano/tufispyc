export default function ApplicationLogo({ className, ...props }) {
    return (
        <img
            src="/images/tufis-logo.png"
            alt="Tufi's Postres y Cupcakes"
            className={className}
            {...props}
        />
    );
}
