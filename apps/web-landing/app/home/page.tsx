// app/courts/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@workspace/ui/components/dialog';
import { Separator } from '@workspace/ui/components/separator';

interface CourtType {
  id: string;
  typeName: string;
  description?: string;
  hourlyRate: string;
}

interface Court {
  id: string;
  courtName: string;
  location: string;
  status: 'Available' | 'Maintenance' | 'Occupied' | 'Booked';
  isActive: boolean;
  courtType: CourtType;
}

// Mock Data (Replace with API data later)
const mockCourts: Court[] = [
  {
    id: "1",
    courtName: "Premier Tennis Court A",
    location: "Downtown Sports Complex, New York",
    status: "Available",
    isActive: true,
    courtType: { id: "t1", typeName: "Tennis", hourlyRate: "45.00", description: "Hard Court" }
  },
  {
    id: "2",
    courtName: "Badminton Hall 3",
    location: "Greenfield Sports Center",
    status: "Occupied",
    isActive: true,
    courtType: { id: "t2", typeName: "Badminton", hourlyRate: "35.00", description: "Indoor Wooden" }
  },
  {
    id: "3",
    courtName: "Basketball Court B",
    location: "Riverside Arena",
    status: "Maintenance",
    isActive: true,
    courtType: { id: "t3", typeName: "Basketball", hourlyRate: "60.00", description: "Indoor" }
  },
  {
    id: "4",
    courtName: "Futsal Court 1",
    location: "Central Park Sports Hub",
    status: "Booked",
    isActive: true,
    courtType: { id: "t4", typeName: "Futsal", hourlyRate: "55.00", description: "Synthetic Turf" }
  },
];

export default function CourtsPage() {
  const [courts] = useState<Court[]>(mockCourts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'rate'>('name');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const courtTypes = useMemo(() => {
    const types = new Set(courts.map(c => c.courtType.typeName));
    return ['All', ...Array.from(types)];
  }, [courts]);

  const filteredCourts = useMemo(() => {
    let result = courts.filter(court => court.isActive);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(court =>
        court.courtName.toLowerCase().includes(term) ||
        court.courtType.typeName.toLowerCase().includes(term) ||
        court.location.toLowerCase().includes(term)
      );
    }

    if (selectedType !== 'All') {
      result = result.filter(court => court.courtType.typeName === selectedType);
    }

    if (selectedStatus !== 'All') {
      result = result.filter(court => court.status === selectedStatus);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.courtName.localeCompare(b.courtName);
      if (sortBy === 'rate') {
        return parseFloat(a.courtType.hourlyRate) - parseFloat(b.courtType.hourlyRate);
      }
      return 0;
    });

    return result;
  }, [courts, searchTerm, selectedType, selectedStatus, sortBy]);

  const getStatusColor = (status: Court['status']) => {
    switch (status) {
      case 'Available': return 'bg-green-600 hover:bg-green-700';
      case 'Occupied': return 'bg-orange-600';
      case 'Booked': return 'bg-red-600';
      case 'Maintenance': return 'bg-gray-600';
      default: return 'bg-gray-500';
    }
  };

  const handleBook = (court: Court) => {
    if (court.status !== 'Available') {
      alert(`ສະໜາມນີ້ປະຈຸບັນ ${court.status.toLowerCase()} ບໍ່ສາມາດຈອງໄດ້`);
      return;
    }
    alert(`ເລີ່ມຂັ້ນຕອນຈອງສະໜາມ: ${court.courtName}`);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">ຊອກຫາ ແລະ ຈອງສະໜາມ</h1>
          <p className="text-lg text-gray-600 mt-2">ສະຖານະພາບທັນສະໄຫມ • ຈອງໄດ້ທັນທີ</p>
        </div>

        {/* Filters */}
        <div className=" p-6 rounded-2xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ຊອກຫາຕາມຊື່ສະໜາມ, ປະເພດ, ຫຼືສະຖານທີ່..."
              className="pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="ທຸກປະເພດ" />
            </SelectTrigger>
            <SelectContent>
              {courtTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="ທຸກສະຖານະ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">ທຸກສະຖານະ</SelectItem>
              <SelectItem value="Available">ຫວ່າງ</SelectItem>
              <SelectItem value="Occupied">ກຳລັງໃຊ້ງານ</SelectItem>
              <SelectItem value="Booked">ຖືກຈອງແລ້ວ</SelectItem>
              <SelectItem value="Maintenance">ບຳລຸງບຳບັດ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'rate')}>
            <SelectTrigger>
              <SelectValue placeholder="ຮຽງຕາມ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">ຊື່ສະໜາມ (A-Z)</SelectItem>
              <SelectItem value="rate">ລາຄາຕໍ່ຊົ່ວໂມງ (ຕ່ຳ - ສູງ)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-gray-600">
            ສະແດງ <span className="font-semibold">{filteredCourts.length}</span> ສະໜາມ
          </p>
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <Card key={court.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl leading-tight">{court.courtName}</CardTitle>
                  <Badge className={getStatusColor(court.status)}>
                    {court.status === 'Available' && 'ຫວ່າງ'}
                    {court.status === 'Occupied' && 'ກຳລັງໃຊ້ງານ'}
                    {court.status === 'Booked' && 'ຖືກຈອງແລ້ວ'}
                    {court.status === 'Maintenance' && 'ບຳລຸງບຳບັດ'}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {court.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">ລາຄາຕໍ່ຊົ່ວໂມງ</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${court.courtType.hourlyRate}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {court.courtType.typeName}
                  </Badge>
                </div>

                {court.courtType.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {court.courtType.description}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedCourt(court)}
                  >
                    ເບິ່ງລາຍລະອຽດ
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleBook(court)}
                    disabled={court.status !== 'Available'}
                  >
                    ຈອງດຽວນີ້
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            ບໍ່ພົບສະໜາມທີ່ກົງກັບເງື່ອນໄຂຂອງທ່ານ
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedCourt} onOpenChange={() => setSelectedCourt(null)}>
        <DialogContent className="max-w-lg">
          {selectedCourt && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCourt.courtName}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {selectedCourt.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ປະເພດສະໜາມ</p>
                    <p className="font-medium">{selectedCourt.courtType.typeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ລາຄາຕໍ່ຊົ່ວໂມງ</p>
                    <p className="font-bold text-2xl">${selectedCourt.courtType.hourlyRate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">ສະຖານະ</p>
                  <Badge className={getStatusColor(selectedCourt.status)}>
                    {selectedCourt.status === 'Available' && 'ຫວ່າງ'}
                    {selectedCourt.status === 'Occupied' && 'ກຳລັງໃຊ້ງານ'}
                    {selectedCourt.status === 'Booked' && 'ຖືກຈອງແລ້ວ'}
                    {selectedCourt.status === 'Maintenance' && 'ບຳລຸງບຳບັດ'}
                  </Badge>
                </div>

                {selectedCourt.courtType.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">ລາຍລະອຽດ</p>
                      <p>{selectedCourt.courtType.description}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCourt(null)}>
                  ປິດ
                </Button>
                <Button onClick={() => handleBook(selectedCourt)} disabled={selectedCourt.status !== 'Available'}>
                  <Calendar className="mr-2 h-4 w-4" />
                  ຈອງສະໜາມນີ້
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}