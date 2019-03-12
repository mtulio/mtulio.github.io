# Linux Process Management

Unix Process
What is the difference between a process and a thread?
A thread is a lightweight process. Each process has a separate stack, text, data and heap. Threads have their own stack, but share text, data and heap with the process. Text is the actual program itself, data is the input to the program and heap is the memory which stores files, locks, sockets. Reference: https://computing.llnl.gov/tutorials/pthreads/#Thread

What is a zombie process?
A zombie process is a one which has completed execution, however it’s entry is still in the process table to allow the parent to read the child’s exit status. The reason the process is a zombie is because it is “dead” but not yet “reaped” by it’s parent. Parent processes normally issue the wait system call to read the child’s exit status whereupon the zombie is removed. The kill command does not work on zombie process. When a child dies the parent receives a SIGCHLD signal.
Reference: http://en.wikipedia.org/wiki/Zombie_process

Describe ways of process inter-communication
POSIX mmap, message queues, semaphores, and Shared memory
Anonymous pipes and named pipes
Unix domain sockets
RPC
For a complete list see http://en.wikipedia.org/wiki/Inter-process_communication
How to daemonize a process
The fork() call is used to create a separate process.
The setsid() call is used to detach the process from the parent (normally a shell).
The file mask should be reset.
The current directory should be changed to something benign.
The standard files (stdin,stdout and stderr) need to be reopened.
Describe how processes executes in a Unix shell
Let’s take the example of /bin/ls. When run ‘ls’ the shell searches in it’s path for an executable named ‘ls, when it finds it, the shell will forks off a copy of itself using the fork system call. If the fork succeeds, then in the child process the shell will run ‘exec /bin/ls’ which will replace the copy of the child shell wit itself. Any parameters that that are passed to ‘ls’ are done so by exec.

When you send a HUP signal to a process, you notice that it has no impact, what could have happened?
During critical section execution, some processes can setup signal blocking. The system call to mask signals is ‘sigprocmask’. When the kernel raises a blocked signal, it is not delivered. Such signals are called pending. When a pending signal is unblocked, the kernel passes it off to the process to handle. It is possible that the process was masking SIGHUP.

How do you end up with zombie processes?
Zombie processes are created when the parent does not reap the child. This can happen due to parent not executing the wait() system call after forking.

What are Unix Signals?
Signals are an inter process communication method. The default signal in Linux is SIG-TERM. SIG-KILL cannot be ignored and causes an application to be forcefully killed. Use the ‘kill’ command to send signals to a process. Another popular signal is the ‘HUP’ signal which is used to ‘reset’ or ‘hang up’ applications. A list of signals can be found here http://man7.org/linux/man-pages/man7/signal.7.html. A snipet from the man page is below.

