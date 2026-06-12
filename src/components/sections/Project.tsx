import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Types
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  owner: { login: string };
}

interface CommitInfo {
  message: string;
  date: string;
}

export default function Project() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("all");
  const [page, setPage] = useState(1);
  const [commits, setCommits] = useState<Record<string, CommitInfo>>({});
  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return "bg-yellow-400 text-black";
      case "typescript":
        return "bg-blue-600 text-white";
      case "python":
        return "bg-green-600 text-white";
      case "php":
        return "bg-indigo-600 text-white";
      case "blade":
        return "bg-red-600 text-white";
      case "c++":
        return "bg-purple-600 text-white";
      case "go":
        return "bg-cyan-600 text-white";
      case "css":
        return "bg-sky-500 text-white";
      case "html":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const PER_PAGE = 8;
  const USERNAME = "fazdajulioarzika";

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch daftar repo
    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated`, {
      headers,
    })
      .then((res) => res.json())
      .then(async (data) => {
        setRepos(data);
        const commitData: Record<string, CommitInfo> = {};

        // Fetch last commit tiap repository
        for (const repo of data) {
          const commitRes = await fetch(
            `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=1`,
            { headers }
          );

          const commitJson = await commitRes.json();

          if (Array.isArray(commitJson) && commitJson.length > 0) {
            commitData[repo.name] = {
              message: commitJson[0].commit.message,
              date: commitJson[0].commit.author.date,
            };
          }
        }

        setCommits(commitData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredRepos =
    language === "all" ? repos : repos.filter((r) => r.language === language);

  const paginated = filteredRepos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-32 pb-32 px-16">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section id="projects" className="space-y-6 pt-32 pb-32 px-16">
      <h2
        className="text-3xl text-center font-semibold"
        data-aos="fade-down"
        data-aos-duration="1100"
      >
        Projects
      </h2>
      <div className="flex items-center justify-end">
        <Select onValueChange={setLanguage} defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {paginated.map((repo) => (
          <Card
            key={repo.id}
            className="hover:shadow-lg transition"
            data-aos="flip-up"
            data-aos-duration="1100"
          >
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Preview Gambar */}
              <img
                src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`}
                alt={repo.name}
                className="rounded-lg mb-3"
              />

              <p className="text-sm text-muted-foreground mb-2">
                {repo.description || "No description"}
              </p>

              {repo.language && (
                <Badge
                  className={`${getLanguageColor(
                    repo.language
                  )} px-1.5 font-bold text-xs`}
                >
                  {repo.language}
                </Badge>
              )}

              {/* Commit Terakhir */}
              {commits[repo.name] && (
                <p className="text-xs mt-2 text-muted-foreground">
                  <strong>Last commit:</strong> {commits[repo.name].message}
                  <br />
                  <span>
                    {new Date(commits[repo.name].date).toLocaleString()}
                  </span>
                </p>
              )}
            </CardContent>

            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href={repo.html_url} target="_blank">
                  View Repository
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={page * PER_PAGE >= filteredRepos.length}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
