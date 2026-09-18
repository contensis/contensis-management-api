import { Component as ComponentBase } from 'contensis-core-api';

export interface Component extends ComponentBase {
    /** Indicates if this component is a child component.
     *  Only applicable for fetched components has no effect when creating or updating. */
    isChild?: boolean;   
    /** Indicates if this component has child components.
     *  Only applicable for fetched components has no effect when creating or updating. */
    hasChildren?: boolean;
    /** Indicates if child components can be added to this component.
     *  Only applicable for fetched components has no effect when creating or updating. */
    canAddChildComponents?: boolean;
    /** Indicates if this component can be added as a child component.
     *  Only applicable for fetched components has no effect when creating or updating. */
    canBeAddedAsChildComponent?: boolean;
}