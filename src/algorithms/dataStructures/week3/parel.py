# python3

"""
2 Parallel processing

Problem Introduction
In this problem you will simulate a program that processes a list of jobs in parallel. Operating systems such as Linux, MacOS or Windows all have special programs in them called schedulers which do exactly this with the programs on your computer.

____________________________________

Problem Description:

Task. You have a program which is parallelized and uses n independent threads to process the given list of m jobs. Threads take jobs in the order they are given in the input. If there is a free thread, it immediately takes the next job from the list. If a thread has started processing a job, it doesn’t interrupt or stop until it finishes processing the job. If several threads try to take jobs from the list simultaneously, the thread with smaller index takes the job. For each job you know exactly how long will it take any thread to process this job, and this time is the same for all the threads. You need to determine for each job which thread will process it and when will it start processing.

_________________________________________

Input Format:

The first line of the input contains integers n and m.
The second line contains m integers ti — the times in seconds it takes any thread to process i-th job.
The times are given in the same order as they are in the list from which threads take jobs.
Threads are indexed starting from 0.

_________________________________________

Output Format:

 Output exactly m lines. i-th line (0-based index is used) should contain two spaceseparated integers — the 0-based index of the thread which will process the i-th job and the time in seconds when it will start processing that job.

"""

# python3

from collections import namedtuple

AssignedJob = namedtuple("AssignedJob", ["worker", "started_at"])


def assign_jobs(n_workers, jobs):
    # TODO: replace this code with a faster algorithm.
    result = []
    next_free_time = [0] * n_workers
    for job in jobs:
        next_worker = min(range(n_workers), key=lambda w: next_free_time[w])
        print('next worker', next_worker)
        result.append(AssignedJob(next_worker, next_free_time[next_worker]))
        print('next fre time', next_free_time)
        next_free_time[next_worker] += job
        print('next fre time After job', next_free_time)
    return result


def main():
    n_workers, n_jobs = map(int, input().split())
    jobs = list(map(int, input().split()))
    assert len(jobs) == n_jobs

    assigned_jobs = assign_jobs(n_workers, jobs)

    for job in assigned_jobs:
        print(job.worker, job.started_at)


if __name__ == "__main__":
    main()
