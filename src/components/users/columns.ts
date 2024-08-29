import { TUser } from "@/type";
import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-right" }, "Email"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("email") || "--"
      );
    },
  },
];
