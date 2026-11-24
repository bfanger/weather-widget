interface Props {
  message: string;
}
export default function Warning({ message }: Props) {
  return (
    <p className="mx-auto my-3 rounded-sm bg-red-900 px-6 py-3 text-center text-base font-medium text-white">
      {message}
    </p>
  );
}
