import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { QuiziesSchema } from "@/validators/quiz";

export default function QuzziesList({ quizzes }: { quizzes: QuiziesSchema[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Created Date</TableHead>
          <TableHead className="min-w-[150px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[100px] text-center">Updated Date</TableHead>
          <TableHead className="w-[100px] text-center" />
          <TableHead className="w-[100px] text-center" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizzes?.map((quiz) => (
          <TableRow key={quiz._id}>
            <TableCell className="text-center">
              {quiz.createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell>{quiz.name}</TableCell>
            <TableCell>{quiz.description}</TableCell>
            <TableCell className="text-center">
              {quiz.updatedAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
