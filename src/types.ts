/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  additionalInfo: string[];
  image: string;
  medium: string;
  date: string;
  client: string;
  anomalyLevel: 'SAFE' | 'EUCLID' | 'KETER' | 'UNKNOWN';
  coordinates: string;
  classificationCode: string;
  isMultiImage?: boolean;
  images?: string[];
}

export interface ShopItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  tags: string[];
}

export interface FolderBlurb {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  bulletPointsListHeader?: string;
  bulletPoints?: string[];
  additionalNote?: string;
}
