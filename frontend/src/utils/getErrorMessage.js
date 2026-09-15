export function getErrorMessage(error) {
    const data = error?.response?.data;

    if (data?.message) {
        return data.message;
    }

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
        return data.errors
            .map(error => error.message || error)
            .join("\n");
    }

    if (Array.isArray(data?.issues) && data.issues.length > 0) {
        return data.issues
            .map(error => error.message)
            .join("\n");
    }

    if (error?.response?.status === 400) {
        return "Os dados enviados são inválidos.";
    }

    if (error?.response?.status === 409) {
        return "Já existe um cadastro com esses dados.";
    }

    if (error?.response?.status >= 500) {
        return "O servidor apresentou um erro. Tente novamente.";
    }

    if (error?.request) {
        return "Não foi possível contactar o servidor.";
    }

    return "Ocorreu um erro inesperado.";
}