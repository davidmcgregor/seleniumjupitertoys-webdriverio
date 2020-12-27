FROM node:15.5.0

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y sudo
    # curl wget git software-properties-common build-essential iproute2 procps gnupg2 unzip

RUN useradd -ms /bin/bash dev && \
    sudo adduser dev sudo && \
    echo "dev ALL=(ALL) NOPASSWD:ALL" | tee /etc/sudoers

USER dev