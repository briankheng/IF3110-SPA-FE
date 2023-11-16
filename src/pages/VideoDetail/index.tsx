import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { VideoApi, UserApi, CommentApi } from "../../api";
import { VideoResponse, Comment, UserResponse } from "../../types";
import { toast } from "react-toastify";

type CommentWithUsername = Comment & { username: string };

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserResponse>({} as UserResponse);
  const [video, setVideo] = useState<VideoResponse>({} as VideoResponse);
  const [comments, setComments] = useState<CommentWithUsername[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await UserApi.getSelf();
        setUser(user);

        const video = await VideoApi.getVideo(id as string);
        setVideo(video);

        if (
          video.isPremium &&
          !user.videos.some((v) => v.id === video.id)
        ) {
          navigate("/");
          return;
        }

        const comments = await Promise.all(
          video.comments.map(async (comment) => {
            const { username } = await UserApi.getUser(
              comment.userId.toString()
            );
            return { ...comment, username };
          })
        );
        setComments(comments);
      } catch (error) {
        toast.error((error as any)?.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!text) return;

      try {
        const comment = await CommentApi.createComment({
          videoId: video.id,
          userId: user.id,
          text,
        });
        setComments([...comments, { username: user.username, ...comment }]);
      } catch (error) {
        toast.error((error as any)?.message);
      } finally {
        setText("");
      }
    },
    [text, video, user, comments]
  );

  const handleEdit = useCallback(
    async (id: string) => {
      const newText = prompt("Enter new comment text");
      if (!newText) return;

      try {
        const updatedComment = await CommentApi.patchComment(id, {
          text: newText,
        });

        setComments(
          comments.map((comment) =>
            comment.id === updatedComment.id
              ? { username: user.username, ...updatedComment }
              : comment
          )
        );
      } catch (error) {
        toast.error((error as any)?.message);
      }
    },
    [comments, user]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const deletedComment = await CommentApi.deleteComment(id);
        setComments(
          comments.filter((comment) => comment.id !== deletedComment.id)
        );
      } catch (error) {
        toast.error((error as any)?.message);
      }
    },
    [comments]
  );

  return (
    <div className="bg-black px-12">
      {/* video */}
      <video key={video?.id} controls className="w-full">
        <source src={video?.url} type="video/mp4" />
      </video>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{video?.title}</h1>
          <p className="text-sm text-gray-400">{video?.views} views</p>
        </div>
        <p className="text-sm text-gray-400 mt-7">{video?.description}</p>
      </div>

      <hr className="border-gray-700 my-10" />

      {/* comments */}
      <section className="bg-dark dark:dark py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({comments.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                className="px-0 w-full resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-700"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-400 flex-end"
            >
              Post comment
            </button>
          </form>

          {comments.map((comment) => (
            <article
              key={comment.id}
              className="my-3 p-6 text-base bg-white rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    @{comment.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
              {user?.username === comment.username && (
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => handleEdit(comment.id.toString())}
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    className="flex items-center text-sm text-red-400 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    onClick={() => handleDelete(comment.id.toString())}
                  >
                    delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VideoDetail;
