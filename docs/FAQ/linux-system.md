Linux Systems
Define the boot process of a Linux system
Once you power a system on, the first thing that happens is the BIOS loads and performs POST or a power on self test, to ensure that the components needed for a boot are ok. For instance if the CPU is defective, the system will give an error that POST has failed. (BIOS stands for Basic Input/Output system)
After POST the BIOS looks at the MBR or master book record and executes the boot loader. In case of a Linux system that might be GRUB or Grand Unified BootLoader. GRUB’s job is to give you the choice of loading a Linux kernel or other OS that you may be running
Once you ask GRUB to load a kernel, usually an initial ramdisk kernel is loaded, which is a small kernel that understands filesystem. This will in turn mount the filesystem and will start the Linux kernel from the filesystem
The kernel will then start init, which is the very first process, usually having PID 1. Init will look at /etc/inittab and will switch to the default run-level which on Linux servers tends to be 3.
There are different run level scripts in /etc/rc.d/rc[0-6].d/ which are then executed based on the runlevel the system needs to be in.
And that’s about it!
How do you make changes to kernel parameters that you want to persist across boot?
/etc/sysctl.conf contains kernel parameters that can be modified. You can also use the sysctl command to make changes at runtime.