<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const user = useAuthenticatedUser();

const modalStore = useModalStore();

const onUserSignout = () => {
  modalStore?.onOpen("signoutUser");
  modalStore?.setIsOpen(true);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="icon" class="rounded-full">
        <Avatar class="size-8" v-if="user.profilePictureUrl">
          <AvatarImage :src="user.profilePictureUrl" :alt="user.name" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CircleUser v-else class="h-5 w-5" />
        <span class="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="onUserSignout">Signout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
