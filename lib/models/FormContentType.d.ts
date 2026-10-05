import { ContentTypeBase, ContentTypeGroup, Field, LocalisedString, LocalisedValue } from 'contensis-core-api';
/**
 * A form content type managed through the Management API. Forms are content
 * types (`dataFormat: 'form'`) created and updated via the content-type
 * operations.
 */
export interface FormContentType extends Omit<ContentTypeBase<'form'>, 'fields'> {
    defaultLanguage?: string;
    entryTitleField?: string;
    supportedLanguages?: string[];
    groups?: ContentTypeGroup[];
    fields: FormField[];
    properties?: Nullable<FormProperties>;
    dataFormat: 'form';
    includeInDelivery?: boolean;
    workflowId?: string;
    versionHistory?: {
        enabled?: boolean;
    };
    reviews?: {
        onDemand?: {
            enabled?: boolean;
        };
        schedule?: {
            enabled?: boolean;
            intervalDays?: number;
            windowDays?: number;
        };
    };
}
/** A value that may be absent, `null` or set. */
export type Nullable<T> = undefined | null | T;
export type FormFieldDataType = 'boolean' | 'dateTime' | 'decimal' | 'integer' | 'string' | 'stringArray';
export type FormFieldDataFormat = 'email' | 'phone' | 'reference' | 'time' | 'url';
/**
 * A form field. `name` is a localised object; `validations` and `editor` use
 * the forms-specific shapes below rather than the canvas shapes in core-api.
 */
export type FormField = Omit<Field, 'validations' | 'editor'> & {
    dataType: FormFieldDataType;
    dataFormat?: FormFieldDataFormat;
    validations?: Nullable<FormFieldValidations>;
    editor?: Nullable<FormFieldEditor>;
};
export type CaptchaSettings = {
    enabled: boolean;
    siteKey?: Nullable<string>;
};
export type FormProperties = {
    captcha: CaptchaSettings;
    localizations?: Nullable<FormLocalizations>;
    confirmationRules?: FormRule<ConfirmationRuleReturn>[];
    autoSaveProgress?: boolean;
    mode?: 'survey';
    requirePermissionToPost?: boolean;
    autoCloseForm?: boolean;
    autoCloseDateTime?: Nullable<string>;
    context?: Nullable<{
        enabled?: boolean;
    }>;
};
/**
 * Localisation strings for gated form states. Rendered-form strings such as
 * `submit` or `next` are a delivery concern and not part of this type.
 */
export type FormLocalizations = {
    closedReasonMessage?: Nullable<LocalisedString>;
    disabledReasonMessage?: Nullable<LocalisedString>;
    requirePermissionToPostMessage?: Nullable<LocalisedString>;
};
export type FormFieldValidation = {
    message?: Nullable<LocalisedString>;
};
export type FormFieldValidationWithValue<T> = FormFieldValidation & {
    value: T;
};
export type AllowedValues = {
    values?: Nullable<LocalisedString[]>;
    labeledValues?: Nullable<{
        value: string;
        label: LocalisedString;
    }[]>;
};
/**
 * Forms-specific field validations. Messages are localised objects, e.g.
 * `{ "en-GB": "Please enter your name" }`.
 */
export type FormFieldValidations = {
    required?: Nullable<FormFieldValidation>;
    min?: Nullable<FormFieldValidationWithValue<number>>;
    max?: Nullable<FormFieldValidationWithValue<number>>;
    minLength?: Nullable<FormFieldValidationWithValue<number>>;
    maxLength?: Nullable<FormFieldValidationWithValue<number>>;
    minCount?: Nullable<FormFieldValidationWithValue<number>>;
    maxCount?: Nullable<FormFieldValidationWithValue<number>>;
    regex?: Nullable<FormFieldValidation & {
        pattern: string;
    }>;
    allowedValue?: Nullable<FormFieldValidationWithValue<any>>;
    allowedValues?: Nullable<FormFieldValidation & AllowedValues>;
    pastDateTime?: Nullable<FormFieldValidation>;
};
export type FormFieldEditorId = 'datetime' | 'datetimeparts' | 'date' | 'dateparts' | 'time' | 'timeparts' | 'decimal' | 'integer' | 'boolean' | 'reference' | 'url' | 'list-dropdown' | 'list' | 'multiline' | 'text';
export type FieldLabelPosition = 'top' | 'leftAligned';
export type FormFieldDateInputFormat = 'dd-mm-yyyy' | 'mm-dd-yyyy' | 'yyyy-mm-dd';
export type FormFieldTimeInputFormat = '12h' | '24h';
export type FormFieldEditorProperties = {
    autoFill?: string;
    rows?: number;
    labelPosition?: FieldLabelPosition;
    cssClass?: string;
    hidden?: boolean;
    /** Localised, e.g. `{ "en-GB": "Enter your name" }`. */
    placeholderText?: Nullable<LocalisedString>;
    prefix?: Nullable<string>;
    suffix?: Nullable<string>;
    /** Options for the part-based date/time editors. */
    dateFormat?: FormFieldDateInputFormat;
    dateSeparator?: string;
    timeFormat?: FormFieldTimeInputFormat;
    timeSeparator?: string;
    /** Default value for a new item in a repeatable (array) field. */
    repeatableItemDefault?: LocalisedValue<any>;
};
/** `label` and `instructions` are localised objects. */
export type FormFieldEditor = {
    id?: Nullable<FormFieldEditorId>;
    instructions?: Nullable<LocalisedString>;
    label?: Nullable<LocalisedString>;
    properties?: FormFieldEditorProperties;
};
/**
 * A condition on a submitted field value. Only `equalTo` has been observed
 * in payloads so far.
 */
export type FormRuleCondition = {
    field: string;
    equalTo?: any;
};
/**
 * A confirmation rule. `when` is absent for unconditional rules; only `and`
 * groups have been observed in payloads so far.
 */
export type FormRule<TReturn = ConfirmationRuleReturn> = {
    when?: Nullable<{
        and?: FormRuleCondition[];
    }>;
    return: TReturn;
};
/**
 * A link confirmation rule. "Redirect to URL" rules store a localised `uri`.
 */
export type ConfirmationRuleReturnUri = {
    link: {
        sys: {
            uri: LocalisedString;
        };
    };
};
/**
 * A link confirmation rule. "Redirect to site view location" rules store the
 * selected `node`.
 */
export type ConfirmationRuleReturnNodeId = {
    link: {
        sys: {
            node: {
                id: string;
            };
        };
    };
};
/**
 * A content confirmation rule. `content` is a localised canvas block
 * document, e.g. `{ "en-GB": [{ "type": "_paragraph", "value": "…" }] }`.
 */
export type ConfirmationRuleReturnContent = {
    content: LocalisedValue<any[]>;
};
/**
 * Confirmation rule return. Rules are evaluated server-side on submit; the
 * submit response resolves values for the requested language.
 */
export type ConfirmationRuleReturn = ConfirmationRuleReturnUri | ConfirmationRuleReturnNodeId | ConfirmationRuleReturnContent;
