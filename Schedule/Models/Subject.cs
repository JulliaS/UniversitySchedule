﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Subject : BaseEntity
    {
        public string Name { get; set; }
        public Faculty Faculty { get; set; }
    }
}
