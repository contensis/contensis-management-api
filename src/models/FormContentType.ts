import { ContentTypeBase, ContentTypeGroup, Field } from 'contensis-core-api';

/**
 * A form content type as managed through the Management API.
 * A form is a content type (`ContentTypeBase<'form'>`) with forms-specific
 * field and payload shapes. Forms are created/updated via the content-type
 * API methods.
 */
export interface FormContentType extends ContentTypeBase<'form'> {
  defaultLanguage?: string;
  entryTitleField?: string;
  supportedLanguages?: string[];
  groups?: ContentTypeGroup[];
  fields: FormField[];
  properties?: Nullable<FormProperties>;
  dataFormat: 'form';
}

export type Nullable<T> = undefined | null | T;

export type FormFieldDataType =
  | 'boolean'
  | 'dateTime'
  | 'decimal'
  | 'integer'
  | 'string'
  | 'stringArray';

export type FormFieldDataFormat =
  | 'email'
  | 'phone'
  | 'reference'
  | 'time'
  | 'url';

/**
 * A form field. Intersects core-api `Field` so `id`, `name`, `groupId` and
 * `description` keep their core types; the intersections below narrow
 * `dataType`/`dataFormat` and swap in the forms-specific validation and
 * editor shapes.
 */
export type FormField = Field & {
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
  localizations: Nullable<{
    submit?: Nullable<string>;
    next?: Nullable<string>;
    previous?: Nullable<string>;
    errorSummaryTitle?: Nullable<string>;
  }>;
  confirmationRules: FormRule<ConfirmationRuleReturn>[];
  autoSaveProgress: boolean;
  mode?: 'survey';
};

export type FormFieldValidation = { message?: Nullable<string> };
export type FormFieldValidationWithValue<T> =
  FormFieldValidation & { value: T };

export type AllowedValues = {
  values?: Nullable<string[]>;
  labeledValues?: Nullable<{ value: string; label: string }[]>;
};

/**
 * Forms-specific field validations. Deliberately distinct from core-api
 * canvas `Validations<Field>` — form field validations use the
 * message-based shape below.
 */
export type FormFieldValidations = {
  required?: Nullable<FormFieldValidation>;
  min?: Nullable<FormFieldValidationWithValue<number>>;
  max?: Nullable<FormFieldValidationWithValue<number>>;
  minLength?: Nullable<FormFieldValidationWithValue<number>>;
  maxLength?: Nullable<FormFieldValidationWithValue<number>>;
  minCount?: Nullable<FormFieldValidationWithValue<number>>;
  maxCount?: Nullable<FormFieldValidationWithValue<number>>;
  regex?: Nullable<FormFieldValidation & { pattern: string }>;
  allowedValue?: Nullable<FormFieldValidationWithValue<any>>;
  allowedValues?: Nullable<FormFieldValidation & AllowedValues>;
  pastDateTime?: Nullable<FormFieldValidation>;
};

export type FormFieldEditorId =
  | 'datetime'
  | 'date'
  | 'decimal'
  | 'integer'
  | 'list-dropdown'
  | 'list'
  | 'multiline'
  | 'text';

export type FieldLabelPosition = 'top' | 'leftAligned';

export type FormFieldEditorProperties = {
  autoFill?: string;
  rows?: number;
  labelPosition?: FieldLabelPosition;
  cssClass?: string;
  hidden?: boolean;
  placeholderText?: string;
};

export type FormFieldEditor = {
  id?: Nullable<FormFieldEditorId>;
  instructions?: Nullable<string>;
  label?: Nullable<string>;
  properties?: FormFieldEditorProperties;
};

export type FormRule<TReturn = ConfirmationRuleReturn> = {
  return: TReturn;
};

/** Management-API confirmation rule target: a link resolved by node id. */
export type ConfirmationRuleReturnNodeId = {
  link: {
    sys: {
      node: { id: string };
    };
  };
};

export type ConfirmationRuleReturnContent = {
  content: string;
};

/**
 * Management-API confirmation rule returns. The rendered-form
 * `link.sys.uri` variant is a delivery concern and is intentionally not
 * part of this type.
 */
export type ConfirmationRuleReturn =
  | ConfirmationRuleReturnNodeId
  | ConfirmationRuleReturnContent;
