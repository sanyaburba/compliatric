const DEV_NODE_ENV = 'development';

const SUCCESS = 'success';
const ERROR = 'error';

const WHERE_NPI = 'NPI = @input_npi';
const REPLACEMENT_NPI_NAME = 'input_npi';
const WHERE_BUSNAME = 'BUSNAME = @input_bus_name';
const REPLACEMENT_BUSNAME_NAME = 'input_bus_name';
const WHERE_FIRSTNAME = 'FIRSTNAME = @input_first_name';
const REPLACEMENT_FIRSTNAME_NAME = 'input_first_name';
const WHERE_MIDNAME = ' AND MIDNAME = @input_mid_name';
const REPLACEMENT_MIDNAME_NAME = 'input_mid_name';
const WHERE_LASTNAME = 'LASTNAME = @input_last_name';
const REPLACEMENT_LASTNAME_NAME = 'input_last_name';

const REPLACEMENT_SOURCE_ID_NAME = '@source_id';

const AND = ' AND ';
const ID_TO_ZERO = 'ID<0';

const AUTH_TIME_LIMIT = 10000;
const UNAUTHORIZED_REQUEST = 'Unauthorized request';
const WRONG_SIGNATURE = 'Signature is incorrect';
const OLD_REQUEST = 'Request timestamp is too old';
const AUTH_PARAMETER_MISSING = 'Missing one or more of the required auth parameters.';

const START_MESSAGE = 'Start.';

const UNKNOWN_ERROR = 'Unknown error';

const STATUS_200_RESPONSE = 'STATUS 200: %s success.';
const STATUS_400_RESPONSE = 'STATUS 400: %s error:\n%o';
const STATUS_401_RESPONSE = 'STATUS 401: %s error:\n%o';

const STATUS_400_INVALID_JSON_ERROR = 'STATUS 400: Invalid JSON format.';
const STATUS_404_ENDPOINT_NOT_FOUND = 'STATUS 404: Endpoint doesn\'t exist.';
const STATUS_500_INTERNAL_SERVER_ERROR = 'STATUS 500: Internal Server Error.';

module.exports = {
    DEV_NODE_ENV,
    SUCCESS,
    ERROR,
    WHERE_NPI,
    REPLACEMENT_NPI_NAME,
    WHERE_BUSNAME,
    REPLACEMENT_BUSNAME_NAME,
    WHERE_FIRSTNAME,
    REPLACEMENT_FIRSTNAME_NAME,
    WHERE_MIDNAME,
    REPLACEMENT_MIDNAME_NAME,
    WHERE_LASTNAME,
    REPLACEMENT_LASTNAME_NAME,
    REPLACEMENT_SOURCE_ID_NAME,
    AND,
    ID_TO_ZERO,
    UNAUTHORIZED_REQUEST,
    AUTH_TIME_LIMIT,
    WRONG_SIGNATURE,
    OLD_REQUEST,
    AUTH_PARAMETER_MISSING,
    START_MESSAGE,
    UNKNOWN_ERROR,
    STATUS_200_RESPONSE,
    STATUS_400_RESPONSE,
    STATUS_401_RESPONSE,
    STATUS_400_INVALID_JSON_ERROR,
    STATUS_404_ENDPOINT_NOT_FOUND,
    STATUS_500_INTERNAL_SERVER_ERROR,
};
