<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { PenBoxIcon, Trash2Icon, UserCog, UserIcon } from "lucide-vue-next";
  import { Button } from "../ui/button";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  import { apiCall, errorHandler } from "@/lib/utils";
  import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
  } from "@/components/ui/dialog";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import UserForm from "../forms/UserForm.vue";
  import { Role, TUser } from "@/type";
  import { toast } from "vue-sonner";
  import SkeletonRow from "../SkeletonRow.vue";
  import { Card } from "@/components/ui/card";

  const props = defineProps<{
    users?: TUser[];
    isLoading?: boolean;
  }>();
  const queryClient = useQueryClient();
  const deleteUserMn = useMutation({
    mutationFn: (id: number) => apiCall("delete", `/users/${id}`),
    onSuccess: (res) => {
      console.log(res);
      toast.success("User deleted!");
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const updateRoleMn = useMutation({
    mutationFn: ({ id, role }: { id: number; role: Role }) =>
      apiCall("put", `/users/${id}/role`, { role }),
    onSuccess: (res) => {
      console.log(res.data);
      toast.success(`Role changed to ${res.data}`);
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const deleteUser = (id: number) => {
    deleteUserMn.mutate(id);
  };

  const handleRoleUpdate = (id: number, role: string) => {
    updateRoleMn.mutate({
      id: id,
      role: role === "user" ? Role.admin : Role.user,
    });
  };
</script>

<template>
  <Card class="p-2 rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <!-- <TableHead>Address</TableHead> -->
          <TableHead>Phone</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>

          <TableHead class="text-right"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonRow v-if="props.isLoading" :columns="9" />
        <TableRow
          v-if="!props.isLoading && props.users"
          v-for="user in props.users"
          :key="user.id"
        >
          <TableCell>{{ user.id }}</TableCell>
          <TableCell
            >{{ user.first_name ?? "--" }}
            {{ user.last_name ?? "--" }}</TableCell
          >
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.gender }}</TableCell>
          <!-- <TableCell>{{ user.address ?? "--" }}</TableCell> -->
          <TableCell>{{ user.phone ?? "--" }}</TableCell>
          <TableCell>{{
            user.dob ? new Date(user.dob).toLocaleDateString() : "--"
          }}</TableCell>
          <TableCell>{{ user.role ?? "--" }}</TableCell>

          <TableCell>{{
            user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "--"
          }}</TableCell>

          <TableCell class="text-right flex gap-2 justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    class="py-1 px-2"
                    @click="handleRoleUpdate(user.id, user.role)"
                  >
                    <UserIcon v-if="user.role === 'admin'" class="h-4 w-4" />
                    <UserCog v-else class="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent class="bg-secondary">
                  <p>
                    {{
                      user.role === "admin"
                        ? "Demote to USER"
                        : "Promote to ADMIN"
                    }}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <PenBoxIcon class="h-4 w-4"
                /></Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Update User Form</DialogTitle>
                </DialogHeader>
                <div class="w-full">
                  <UserForm :user="user" />
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <Trash2Icon class="h-4 w-4"
                /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this user from our server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="deleteUser(user.id)"
                    >Delete</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
        <TableRow v-else class="w-full">
          <TableCell class="font-medium w-full text-center" colspan="9"
            >No user found</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
