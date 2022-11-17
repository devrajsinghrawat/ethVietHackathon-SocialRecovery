const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-1 alert alert-error">
      <div>
        <label>{message}</label>
      </div>
    </div>
  );
};

export default ErrorMessage;
