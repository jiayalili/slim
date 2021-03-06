#!/bin/bash

package=$1

echo $package

mkdir -p release/$package

cp -R src/$package/package.json ./release/$package
cp LICENSE README.md .release-it.json ./release/$package/
mkdir -p release/$package
cp -R ./dist/release/$package/* ./release/$package

cd release/$package

release-it
