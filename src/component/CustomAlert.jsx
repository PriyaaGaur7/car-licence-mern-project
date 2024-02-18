import "./CustomAlert.css"

const CustomAlert = ({ message }) => {
    return (
        <div class="alert-box">
            <p>{message}</p>
        </div>
    );
};

export default CustomAlert;