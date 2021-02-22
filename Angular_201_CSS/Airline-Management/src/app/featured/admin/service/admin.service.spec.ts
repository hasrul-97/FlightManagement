import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });

  it('should return add flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let flight: {
      flightID: 'asd'
    }
    let response;

    spyOn(adminService.http, 'post').and.returnValue(of(data))
    adminService.addFlight(flight).subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('should get flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let response;

    spyOn(adminService.http, 'get').and.returnValue(of(data))
    adminService.getFlight().subscribe(data => {
      response = data
    });
    expect(response).toEqual(data);
  })

  it('should add passenger', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let passenger: {
      passengerName: 'asd'
    }
    let response;

    spyOn(adminService.http, 'post').and.returnValue(of(data))
    adminService.addPassenger(passenger).subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('should get passenger for flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let response;

    spyOn(adminService.http, 'get').and.returnValue(of(data))
    adminService.getPassengerForFlight('something').subscribe(data => {
      response = data
    });
    expect(response).toEqual(data);
  })

  it('should update flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let flight: {
      flightID: 'asd'
    }
    let response;

    spyOn(adminService.http, 'post').and.returnValue(of(data))
    adminService.updateFlight(flight).subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('should get ancillary service for flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let response;

    spyOn(adminService.http, 'get').and.returnValue(of(data))
    adminService.getAncillarServiceForFlight('something').subscribe(data => {
      response = data
    });
    expect(response).toEqual(data);
  })

  it('should get shopping item for flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let response;

    spyOn(adminService.http, 'get').and.returnValue(of(data))
    adminService.getShoppingItemForFlight('something').subscribe(data => {
      response = data
    });
    expect(response).toEqual(data);
  })

  it('should get special meal for flight', () => {
    const adminService: AdminService = TestBed.get(AdminService)
    let data: {
      statusCode: 200,
      dataList: []
    }
    let response;

    spyOn(adminService.http, 'get').and.returnValue(of(data))
    adminService.getSpecialMealsForFlight('something').subscribe(data => {
      response = data
    });
    expect(response).toEqual(data);
  })
  
});
