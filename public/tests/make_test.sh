#!/bin/bash
number1=$1
number2=$2
typeq=$3
while [ "$number1" -le "$number2" ]; do
	file1="$number1".1."$typeq".txt
	file2="$number1".2."$typeq".txt
	if [[ -f "/home/lomtev/Cours-Work-home/base/tests/$file1" ]];
		then
			echo "file is make"
		else
			touch "$file1"
	fi
	if [[ -f "/home/lomtev/Cours-Work-home/base/tests/$file2" ]];
                then
			echo "file is make"
                else
                        touch "$file2"
	fi
	let number1+=1
done
exit 0
