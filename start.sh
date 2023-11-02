#!/bin/sh
#
# Start the openTCS kernel.
#

find ./ -type f -print0 | xargs -0 chmod +x

./openTCS-Kernel/start*.sh & \
./openTCS-KernelControlCenter/start*.sh & \
./openTCS-ModelEditor/start*.sh & \
./openTCS-OperationsDesk/start*.sh