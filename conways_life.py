#!/usr/bin/env python
# encoding: utf-8
"""
conways_life.py

Created by Brent Ransom on 2014-01-28.
Copyright (c) 2014 mycrazydream. All rights reserved.

Conway's Game of Life

Axiom 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Axiom 2. Any live cell with two or three live neighbours lives on to the next generation.
Axiom 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
Axiom 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

"""

import sys
import os

class Life:
	def __init__(self,scale):
		self.scale 	= scale
		self.range	= range(scale)
		self.board 	= [[0 for j in self.range] for i in self.range]
		self.seed_the_board()
		self.show_board_in_terminal()
		#self.test_board(scale)
		pass

	def seed_the_board(self):
		"""docstring for seed_the_board"""
		from random import randrange
		i=-1
		for row in self.board:
			i+=1
			j=-1
			for col in self.board[len(row)-1]:
				j+=1
				seed = 0
				if randrange(1,10)>8: 
					seed = 1
				self.board[i][j] = seed
		pass
		
	def test_cell(self,neighbors,cell):
		"""
		Given a cell on the board, test its next generation according to the four axioms of Conway's Game of Life
		"""
		if cell==0:
			print self.axiom_four(neighbors)
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
		"""docstring for test_neighbors"""
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
			self.set_cell(i,j,cell)
		pass
	
	def set_cell(self,i,j,v):
		"""docstring for set_cell"""
		self.board[i][j] = v
		pass
		
	def get_cell(self,i,j):
		"""docstring for get_cell"""
		if len(self.board) >= i and len(self.board[i]) >= j:
 			cell = self.board[i][j] 
		else:
			cell = "Does not exist"
		return cell
		
	def axiom_one(self,neighbors):
		"""Any live cell with fewer than two live neighbours dies, as if caused by under-population."""
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
		"""Any live cell with two or three live neighbours lives on to the next generation."""
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
		"""Any live cell with more than three live neighbours dies, as if by overcrowding."""
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
		"""Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction."""
		live_neighbors=0
		for i in neighbors:
			if i==1:
				live_neighbors += 1
		if live_neighbors == 3:
			result = True
		else:
			result = False

		return result
		
	def test_board(self,scale):
		i=-1
		for row in self.board:
			i+=1
			j=-1
			for col in self.board[len(row)-1]:
				j+=1
				self.test_neighbors(i,j)
		self.show_board_in_terminal()
		pass

	def show_board_in_terminal(self):
		"""docstring for show_board_in_terminal"""
		for row in self.board:
			column	= self.board[len(row)-1]
			print column
		pass


scale 	= 20
ecology	= Life(scale)
