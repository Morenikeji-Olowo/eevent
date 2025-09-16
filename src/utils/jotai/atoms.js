import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const rightSideCollapsed = atomWithStorage("right-side-collapsed", true);
export const postLike = atomWithStorage("post-like", false);
export const navNavigationState = atomWithStorage("navNavigationState", "")