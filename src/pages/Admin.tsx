import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: number;
  user_id: string;
  ten_bulls_level: number;
  ten_bulls_advice: string;
  suggestions: {
    anxiety: string;
    advice: string;
    fortune_telling: string;
    religion: string;
    quote: string;
    philosophy: string;
  };
  GPT_analysis: string;
}

interface LogData {
  id: number;
  user_id: string;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
  } | null;
  time_stamp: string;
  content: string;
  gender: string;
}

interface Feedback {
  id: number;
  user_id: string;
  try_num: number;
  scores: number[];
  created_at: string;
}

interface AllData {
  users: User[];
  log_data: LogData[];
  feedback: Feedback[];
}

export function Admin() {
  const [data, setData] = useState<AllData | null>(null);

  const url = 'https://theendof2024backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/all_data`);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [url]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="log_data">Log Data</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Ten Bulls Level</TableHead>
                    <TableHead>Ten Bulls Advice</TableHead>
                    <TableHead>Suggestions</TableHead>
                    <TableHead>GPT Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.user_id}</TableCell>
                      <TableCell>{user.ten_bulls_level}</TableCell>
                      <TableCell>{user.ten_bulls_advice}</TableCell>
                      <TableCell>
                        <div className="max-w-md truncate">
                          {JSON.stringify(user.suggestions)}
                        </div>
                      </TableCell>
                      <TableCell>{user.GPT_analysis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log_data">
          <Card>
            <CardHeader>
              <CardTitle>Log Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Emotion</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.log_data.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.user_id}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {log.emotions ? 
                          `Joy: ${log.emotions.joy}, Sadness: ${log.emotions.sadness}, Anger: ${log.emotions.anger}, Fear: ${log.emotions.fear}`
                          : 'No emotion data'
                        }
                      </TableCell>
                      <TableCell>
                        {typeof log.content === 'object' 
                          ? JSON.stringify(log.content) 
                          : log.content}
                      </TableCell>
                      <TableCell>{log.gender}</TableCell>
                      <TableCell>{new Date(log.time_stamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Try Number</TableHead>
                    <TableHead>Scores</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.feedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>{feedback.id}</TableCell>
                      <TableCell>{feedback.user_id}</TableCell>
                      <TableCell>{feedback.try_num}</TableCell>
                      <TableCell>{feedback.scores.join(", ")}</TableCell>
                      <TableCell>{new Date(feedback.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Admin;
