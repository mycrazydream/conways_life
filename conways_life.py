#!/usr/bin/env python
# encoding: utf-8
"""
conways_life.py

Created by Brent Ransom on 2014-01-28.
Copyright (c) 2014 mycrazydream. All rights reserved.

Conway's Game of Life
http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

Axiom 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Axiom 2. Any live cell with two or three live neighbours lives on to the next generation.
Axiom 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
Axiom 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

If you don't have termcolor, it can be downloaded here: https://pypi.python.org/pypi/termcolor
Expand the package, then run (may need root authority)
sudo python setup.py build
sudo python setup.py install

"""

import sys
import os
import time
from termcolor import colored

class Life:
	def __init__(self,scale):
		"""
		int scale Size of our square grid, width and height
		"""
		self.scale 		= scale
		self.range		= range(scale)
		self.board 		= [[0 for j in self.range] for i in self.range]
		self.temp_board = [[0 for j in self.range] for i in self.range]
		self.generation = 0
		self.seed_the_board()
		try:
			self.pass_a_generation()
		except KeyboardInterrupt:
			print ' The Game of Life is over after '+str(self.generation)+' generations!'
		pass

	def seed_the_board(self):
		"""
		Randomly assign values of 1 (alive) to cells on the board
		"""
		from random import randrange
		i=-1
		for row in self.board:
			i+=1
			j=-1
			for col in self.board[i]:
				j+=1
				seed = 0
				if randrange(1,10)>8: 
					seed = 1
				self.board[i][j] = seed
		pass
	def clear_temp_board(self):
		for i in range(scale):
			for j in range(scale):
				self.temp_board[i][j] = 0
		pass
		
	def pass_a_generation(self):
		"""
		Self calling fn to run the evolution of each generation
		"""
		self.generation+=1
		self.test_board()
		for i in range(scale):
			for j in range(scale):
				self.board[i][j] = self.temp_board[i][j]
		self.clear_temp_board()
		time.sleep(.5)
		self.pass_a_generation()		
		pass
		
	def test_cell(self,neighbors,cell):
		"""
		Given a cell on the board, test its next generation according to the four axioms of Conway's Game of Life
		
		list 	neighbors 	Is a list of values 0 or 1 of the eight surrounding neighbor cells
		int 	cell 		Value of the cell we are testing, changes the axiom rule logic
		"""
		if cell==0:
			if self.axiom_four(neighbors):
				next_generation = True
			else:
				next_generation = False
		elif cell==1:
			if self.axiom_one(neighbors):
				next_generation = False
			elif self.axiom_two(neighbors):
				next_generation = True
			elif self.axiom_three(neighbors):
				next_generation = False
			else:
				next_generation = -1
		else:
			next_generation = -1

		return next_generation

	def test_neighbors(self,i,j):
		"""
		Grab the neighbors of the cell defined by i,j and pass them on so that the cell can be tested according 
		to their values
		
		int i Key of first list (row #)
		int j Key of second list (col #)
		"""
		cell=0
		if len(self.board) >= i and len(self.board[i]) >= j:
			cell 	= self.board[i][j] 

		try:
			one = self.board[i-1][j+1]
		except:
			one	= False
			
		try:
			two	= self.board[i][j+1]
		except:
			two	= False
		
		try:
			three	= self.board[i+1][j+1]
		except:
			three	= False
		
		try:
			four	= self.board[i+1][j]
		except:
			four	= False
			
		try:
			five	= self.board[i+1][j-1]
		except:
			five	= False
		
		try:
			six	= self.board[i][j-1]
		except:
			six	= False
		
		try:
			seven	= self.board[i-1][j-1]
		except:
			seven	= False
			
		try:
			eight	= self.board[i-1][j]
		except:
			eight	= False
			
		neighbors = [one,two,three,four,five,six,seven,eight]
		result = self.test_cell(neighbors,cell)

		if result != -1:
			if result == True:
				cell = 1
			else:
				cell = 0
			self.set_cell(i,j,cell,True)
		pass
	
	def set_cell(self,i,j,v,temp):
		"""
		int i Key of first list (row #)
		int j Key of second list (col #)
		int v Value to set the cell on the board
		"""
		if(temp==True):
			self.temp_board[i][j] = v
		else:
			self.board[i][j] = v
		pass
		
	def get_cell(self,i,j):
		"""
		int i Key of first list (row #)
		int j Key of second list (col #)
		"""
		if len(self.board) >= i and len(self.board[i]) >= j:
 			cell = self.board[i][j] 
		else:
			cell = "Does not exist"
		return cell
		
	def axiom_one(self,neighbors):
		"""
		Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		
		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		"""
		live_neighbors=0
		for i in neighbors:
			if i==1:
				live_neighbors += 1
		if live_neighbors < 2:
			result = True
		else:
			result = False

		return result

	def axiom_two(self,neighbors):
		"""
		Any live cell with two or three live neighbours lives on to the next generation.
		
		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		"""
		live_neighbors=0
		for i in neighbors:
			if i==1:
				live_neighbors += 1
		if live_neighbors == 2 or live_neighbors == 3:
			result = True
		else:
			result = False

		return result

	def axiom_three(self,neighbors):
		result = False
		"""
		Any live cell with more than three live neighbours dies, as if by overcrowding.
		
		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		"""
		live_neighbors=0
		for i in neighbors:
			if i==1:
				live_neighbors += 1
		if live_neighbors >= 3:
			result = True
		else:
			result = False

		return result

	def axiom_four(self,neighbors):
		result = True
		"""
		Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		
		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		"""
		live_neighbors=0
		for i in neighbors:
			if i==1:
				live_neighbors += 1
		if live_neighbors == 3:
			result = True
		else:
			result = False

		return result
		
	def test_board(self):
		scale = self.scale
		for i in range(scale):
			for j in range(scale):
				self.test_neighbors(i,j)
		self.show_board_in_terminal()
		pass

	def show_board_in_terminal(self):
		"""
		Output the board in the terminal/shell using color and very different characters to make 
		visually obvious the change from generation to generation
		"""
		i=-1
		for col in self.board:
			i+=1
			row	= self.board[i]
			string = ''
			for r in row:
				if r==0:
					string += colored('O','blue') + ' '
				else:
					string += colored("#",'yellow') + ' '
			print string
		print "\n"
		print "Hit Ctrl+C to stop Conway's Game of Life"
		pass


scale 	= 52 #arbitrary value, ideally we will ask the user how big the gameboard should be
ecology	= Life(scale)