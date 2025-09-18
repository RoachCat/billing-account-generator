import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users } from "@/utils/users";

export default function UserSelector({ setUser }: { setUser: Function }) {
  const onValueChange = (id: string) => {
    const user = users.find((user) => user.id === id);
    setUser(user);
  };

  return (
    <div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Escoge un usuario" />
        </SelectTrigger>
        <SelectContent>
          {users.map((item, index) => (
            <SelectItem value={item.id} key={index}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
