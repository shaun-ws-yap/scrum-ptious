export default function findSubmissionByTask(submissions, tid) {
  const PENDING  = 'pending';
  return submissions.find(submission => {
    return submission.task_id === tid 
      && submission.status === PENDING;
  });
}