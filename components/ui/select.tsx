import * as Select from "@radix-ui/react-select";

const RadixSelect = ({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void;
  defaultValue: string;
}) => {
  return (
    <Select.Root onValueChange={onValueChange} defaultValue={defaultValue}>
      <Select.Trigger className="w-32">
        <Select.Value placeholder="Select a type" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Location Type</Select.Label>
          <Select.Item value="country">Country</Select.Item>
          <Select.Item value="region">Region</Select.Item>
          <Select.Item value="city">City</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default RadixSelect;
