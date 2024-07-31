import type { ModalStore, ModalType } from "~/types";

export const useModalStore = defineStore("modalStore", {
  state: (): ModalStore => ({
    isOpen: false,
    type: null,
  }),
  actions: {
    onOpen(payload: ModalType): void {
      this.type = payload;
    },
    onClose(): void {
      this.type = null;
    },
    setIsOpen(payload: boolean) {
      this.isOpen = payload;
    },
  },
});
