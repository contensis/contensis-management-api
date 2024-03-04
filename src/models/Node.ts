import { VersionInfo } from 'contensis-core-api';

type Proxy = any | null;
type Renderer = any | null;

/**
 * A Node as it is returned from the Management API
 */
export interface Node {
  id: string;
  parentId?: string;
  projectId: string;
  displayName: { [key: string]: string };
  slug: { [key: string]: string };
  path: { [key: string]: string };
  entryId?: string;
  isCanonical: boolean;
  restrictedToLanguages: string[];
  childCount: number;
  renderer: Renderer;
  proxy: Proxy;
  includeInMenu: boolean;
  version: Partial<VersionInfo>;
}

